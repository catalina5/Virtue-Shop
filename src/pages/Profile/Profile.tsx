/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from 'react'
import { getProfileFromLS, setProfileFromLS } from 'src/utils/auth'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { changePassword, getUser, updateUser } from 'src/apis/auth.api'
import { User } from 'src/types/user.type'
import { toast } from 'react-toastify'
import Frame from '../../assets/images/Frame.jpg'
import FileBase from 'react-file-base64'
import { AppContext } from 'src/contexts/app.context'
import { useTranslation } from 'react-i18next'

type FormStateType = Omit<User, '_id'>
const Profile = () => {
  const { t } = useTranslation('profile')
  const { t: t2 } = useTranslation('cart')
  const profileAccessToken = getProfileFromLS()
  const queryClient = useQueryClient()
  const initialFromState: FormStateType = {
    name: '',
    email: '',
    phone: 0,
    address: '',
    avatar: ''
  }
  const initialPasswordState = {
    password: '',
    newPassword: ''
  }
  const [formState, setFormState] = useState<FormStateType>(initialFromState)
  const [passwordState, setPasswordState] = useState(initialPasswordState)
  useEffect(() => {
    setFormState({
      name: profileAccessToken?.name,
      email: profileAccessToken?.email,
      phone: profileAccessToken?.phone,
      address: profileAccessToken?.address,
      avatar: profileAccessToken?.avatar
    })
  }, [])

  useQuery({
    queryKey: ['user', profileAccessToken._id],
    queryFn: () => getUser(profileAccessToken._id),
    enabled: profileAccessToken._id !== undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSuccess: (data: any) => {
      setFormState(data.data.data)
    }
  })

  const [isDisabled, setDisable] = useState(true)
  const [isDisabledEmail, setDisableEmail] = useState(true)
  const { setProfile } = useContext(AppContext)
  const updateProfileMutation = useMutation({
    mutationFn: () => {
      return updateUser(profileAccessToken._id, formState)
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['user', profileAccessToken._id], data)
    }
  })
  const changePasswordMutation = useMutation({
    mutationFn: () => {
      const body = {
        email: profileAccessToken?.email,
        password: passwordState.password,
        new_password: passwordState.newPassword
      }
      return changePassword(body)
    },
    onError: (data: any) => {
      toast.warn(data.response.data.message)
    },
    onSuccess: (data) => {
      setDisableEmail(true)
      console.log(data)
      toast.success('Đã đổi mật khẩu thành công!')
    }
  })
  const handleChange = (name: keyof FormStateType) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({ ...prev, [name]: event.target.value }))
  }
  const handleChangePassword = (name: any) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordState((prev) => ({ ...prev, [name]: event.target.value }))
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (passwordState.password !== '' && passwordState.newPassword !== '') {
      changePasswordMutation.mutate()
    }
    if (passwordState.password === '' && passwordState.newPassword === '') {
      updateProfileMutation.mutate(undefined, {
        onSuccess: () => {
          const newProfile = { ...profileAccessToken, avatar: formState?.avatar }
          setDisable(true)
          setProfileFromLS(newProfile)
          setProfile(newProfile)
          toast.success(' Đã sửa thành công!')
        }
      })
    }
  }

  return (
    <div className='mobile:px-5 dark:text-white'>
      <div>
        <h1 className='font-[700] text-[25px] mobile:text-[20px]'>{t('info')}</h1>
        <span className='text-text-color'>{t('edit info')}</span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-6 mb-6 md:grid-cols-2 mt-[40px]'>
          <div className='font-[700] text-[18px] flex justify-between'>
            <h1>{t('personal')}</h1>
            <button
              onClick={(e) => {
                e.preventDefault()
                setDisable(!isDisabled)
              }}
              className='text-secondary font-[600] text-[18px]'
            >
              {isDisabled ? `${t('edit')}` : `${t('close')}`}
            </button>
          </div>
          <div className='grid grid-cols-2 gap-x-10 mobile:grid-cols-1'>
            <div className='relative'>
              <div className='h-[250px]  w-[250px] bg-primary mx-auto rounded-[100rem] overflow-hidden'>
                {formState?.avatar ? <img src={formState?.avatar} alt='' /> : <img src={Frame} alt='' />}
              </div>
              <button className='opacity-0 hover:opacity-100 cursor-pointer rounded-full h-[250px] flex justify-center items-center w-[250px] absolute top-[50%] left-[55%] translate-x-[-50%] translate-y-[-50%]'>
                <FileBase
                  type='file'
                  name='picture'
                  className='hidden'
                  onDone={(base64: any) => {
                    setFormState((prev) => {
                      return { ...prev, avatar: base64.base64 }
                    })
                    setDisable(false)
                  }}
                  accept='image/png, image/jpg, image/webp'
                />
              </button>
            </div>
            <div className='grid gap-y-5'>
              <div>
                <label htmlFor='name' className='block mb-2 dark:text-text-color text-sm font-medium text-gray-900 '>
                  {t2('fullname')}
                </label>
                <input
                  disabled={isDisabled}
                  type='text'
                  id='last_name'
                  className='dark:bg-[#1C1C24] dark:text-text-color dark:border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full p-2.5 '
                  placeholder='Nguyễn Văn ...'
                  required
                  value={formState.name}
                  onChange={handleChange('name')}
                />
              </div>
              <div>
                <label htmlFor='company' className='dark:text-text-color block mb-2 text-sm font-medium text-gray-900 '>
                  {t2('address')}
                </label>
                <input
                  disabled={isDisabled}
                  type='text'
                  id='company'
                  className='dark:bg-[#1C1C24] dark:text-text-color dark:border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full p-2.5 '
                  placeholder='Flowbite'
                  required
                  value={formState.address}
                  onChange={handleChange('address')}
                />
              </div>
              <div>
                <label htmlFor='phone' className=' dark:text-text-color block mb-2 text-sm font-medium text-gray-900 '>
                  {t2('phone number')}
                </label>
                <input
                  disabled={isDisabled}
                  type='number'
                  id='phone'
                  className='dark:bg-[#1C1C24] dark:text-text-color dark:border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full p-2.5  '
                  placeholder='123-45-678'
                  pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                  required
                  value={formState.phone}
                  onChange={handleChange('phone')}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='font-[700] text-[18px] flex justify-between mt-[40px] mb-[20px]'>
          <h1> {t('account')}</h1>
          <button
            onClick={(e) => {
              e.preventDefault()
              setDisableEmail(!isDisabledEmail)
            }}
            className='text-secondary font-[600] text-[18px]'
          >
            {isDisabledEmail ? `${t('edit')}` : `${t('close')}`}
          </button>
        </div>

        <div className='mb-6'>
          <label htmlFor='email' className='dark:text-text-color block mb-2 text-sm font-medium text-gray-900 '>
            {t2('address')} email
          </label>
          <input
            disabled
            type='email'
            id='email'
            className=' dark:bg-[#1C1C24] dark:text-text-color dark:border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full p-2.5'
            placeholder='john.doe@company.com'
            required
            value={formState.email}
            onChange={handleChange('email')}
          />
        </div>
        <div className='grid grid-cols-2 gap-x-10'>
          <div className='mb-6'>
            <label htmlFor='password' className='dark:text-text-color block mb-2 text-sm font-medium text-gray-900 '>
              {t('old password')}
            </label>
            <input
              disabled={isDisabledEmail}
              type='password'
              id='password'
              className=' dark:bg-[#1C1C24] dark:text-text-color dark:border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full p-2.5 '
              placeholder='•••••••••'
              required
              value={passwordState.password}
              onChange={handleChangePassword('password')}
            />
          </div>
          <div className='mb-6'>
            <label
              htmlFor='confirm_password'
              className='dark:text-text-color block mb-2 text-sm font-medium text-gray-900'
            >
              {t('new password')}
            </label>
            <input
              disabled={isDisabledEmail}
              type='password'
              id='confirm_password'
              className='dark:bg-[#1C1C24] dark:text-text-color dark:border-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-primary block w-full p-2.5  '
              placeholder='•••••••••'
              required
              value={passwordState.newPassword}
              onChange={(event) => setPasswordState((prev) => ({ ...prev, newPassword: event.target.value }))}
            />
          </div>
        </div>

        {/* Button */}
        <div className='flex justify-between'>
          {!isDisabled && (
            <button
              type='submit'
              className='text-white  bg-primary hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center '
            >
              {t('confirm edit info')}
            </button>
          )}
          {!isDisabledEmail && (
            <button
              type='submit'
              className='text-white  bg-primary hover:opacity-90 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center '
            >
              {t('confirm edit password')}
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default Profile