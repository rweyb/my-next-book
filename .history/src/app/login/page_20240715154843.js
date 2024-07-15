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

/** サインイン画面
 * @screenname SignInScreen
 * @description ユーザのサインインを行う画面
 */
export default function SignInScreen() {
    const toast = useToast()
    const router = useRouter()
    const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    } = useForm()

    const [show, setShow] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
    // バリデーションチェック
    await signInWithEmail({
        email: data.email,
        password: data.password,
    }).then((res) => {
        if (res) {
        console.log('ログイン成功')
        } else {
        console.log('ログイン失敗')
        }
    })
    })

    return (
    <Flex
        flexDirection='column'
        width='100%'
        height='100vh'
        justifyContent='center'
        alignItems='center'
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

            <FormControl isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor='password'>パスワード</FormLabel>
                <InputGroup size='md'>
                <Input
                    pr='4.5rem'
                    type={show ? 'text' : 'password'}
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
                    <Button h='1.75rem' size='sm' onClick={() => setShow(!show)}>
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
                isLoading={isSubmitting}
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
