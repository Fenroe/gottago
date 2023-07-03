import { VStack, Container, Heading, FormControl, FormLabel, Input, Button, FormErrorMessage, Text, ButtonGroup, Link } from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link as RouterLink } from "react-router-dom"
import { sharedRequiredErrorMessage } from "../data"
import { useNavigate } from "react-router-dom"
import { login } from "../firebase"

export const Login = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required(sharedRequiredErrorMessage)
                .email('Please enter a valid email address'),
            password: Yup.string()
                .required(sharedRequiredErrorMessage)
                .min(7, 'Your password is too short')
        }),
        onSubmit: async (values, actions) => {
            await login(values.email, values.password)
            actions.resetForm()
            navigate('/dashboard')
        }
    })

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <VStack
                h="100vh"
                justifyContent="center">
                    <Heading>Log In</Heading>
                    <FormControl isInvalid={formik.errors.email !== undefined && formik.touched.email}>
                        <FormLabel>Email</FormLabel>
                        <Input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}/>
                        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.password !== undefined && formik.touched.password}>
                        <FormLabel>Password</FormLabel>
                        <Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}/>
                        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
                    </FormControl>
                    <ButtonGroup flexDirection="column" alignItems="center" gap="1rem">
                        <Button type="submit" variant="outline" width="100%">
                            Continue
                        </Button>
                        <Button variant="outline" width="100%">
        
                            Continue With Google
                        </Button>
                    </ButtonGroup>
                    <Text>Don&apos;t have an account? <Link as={RouterLink} to="/signup">Sign up!</Link></Text>
                </VStack>
            </form>
        </Container>
    )
}
