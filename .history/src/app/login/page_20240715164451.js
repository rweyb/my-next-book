'use client'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@/common/design'
import { signInWithEmail } from '@/lib/firebase/apis/auth'

// フォームで使用する変数の型を定義
// TypeScriptの型定義を削除
// type formInputs = {
//   email: string
//   password: string
// }

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */
export default function SignInScreen() {
  const toast = useToast() // トースト通知を使用するためのフック
  const router = useRouter() // ルーターを使用するためのフック
  const {
    handleSubmit, // フォーム送信ハンドラー
    register, // フォームフィールドを登録するための関数
    formState: { errors, isSubmitting }, // フォームの状態を取得
  } = useForm() // 型引数を削除

  const [show, setShow] = useState(false) // パスワード表示/非表示の状態を管理

  const onSubmit = handleSubmit(async (data) => {
    // サインイン処理を実行し、結果を取得
    await signInWithEmail({
      email: data.email,
      password: data.password,
    }).then((res) => {
      // サインイン結果に応じてトースト通知を表示
      if (res.isSuccess) {
        toast({
          title: res.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        })
      } else {
        toast({
          title: res.message,
          status: 'error',
          duration: 2000,
          isClosable: true,
        })
      }
    })
  })

  const handleClick = () => setShow(!show)

  return (
    <Flex
      flexDirection='column' // フレックスボックスの方向を縦に設定
      width='100%' // 幅を100%に設定
      height='100vh' // 高さを100vhに設定
      justifyContent='center' // 垂直方向の中央に配置
      alignItems='center' // 水平方向の中央に配置
    >
      <VStack spacing='5'>
        <Heading>ログイン</Heading>
        <form onSubmit={onSubmit}>
          <VStack spacing='4' alignItems='left'>
            <FormControl isInvalid={Boolean(errors.email)}>
              <FormLabel htmlFor='email' textAlign='start'>
                メールアドレス
              </FormLabel>
              <Input
                id='email'
                {...register('email', {
                  required: '必須項目です',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message} 
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={Boolean(errors.password)}> /
              <FormLabel htmlFor='password'>パスワード</FormLabel>
              <InputGroup size='md'>
                <Input
                  pr='4.5rem'
                  type={show ? 'text' : 'password'} // パスワードの表示/非表示を切り替え
                  {...register('password', {
                    required: '必須項目です',
                    minLength: {
                      value: 8,
                      message: '8文字以上で入力してください',
                    },
                    maxLength: {
                      value: 50,
                      message: '50文字以内で入力してください',
                    },
                  })}
                />
                <InputRightElement width='4.5rem'>
                  <Button h='1.75rem' size='sm' onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              marginTop='4'
              color='white'
              bg='teal.400'
              isLoading={isSubmitting} // 送信中の状態を表示
              type='submit'
              paddingX='auto'
              _hover={{
                borderColor: 'transparent',
                boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              ログイン
            </Button>
            <Button
              as={NextLink}
              bg='white'
              color='black'
              href='/signup'
              width='100%'
              _hover={{
                borderColor: 'transparent',
                boxShadow: '0 7px 10px rgba(0, 0, 0, 0.3)',
              }}
            >
              新規登録はこちらから
            </Button>
          </VStack>
        </form>
      </VStack>
    </Flex>
  )
}
