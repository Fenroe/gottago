import { Container, VStack, Heading, FormControl, FormLabel, Input, FormErrorMessage, ButtonGroup, Button, Link, Text } from "@chakra-ui/react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { sharedRequiredErrorMessage } from "../data"
import { signup } from "../firebase"

export const Signup = () => {
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .required(sharedRequiredErrorMessage),
            lastName: Yup.string()
                .required(sharedRequiredErrorMessage),
            email: Yup.string()
                .required(sharedRequiredErrorMessage)
                .email('Please enter a valid email address'),
            password: Yup.string()
                .required(sharedRequiredErrorMessage)
                .min(7, 'Your password is too short'),
            confirmPassword: Yup.string()
                .required(sharedRequiredErrorMessage )
                .oneOf([Yup.ref('password')], 'Passwords must be identical ')
        }),
        onSubmit: async (values, actions) => {
            await signup(values.firstName, values.lastName, values.email, values.password)
            actions.resetForm()
            navigate('/dashboard')
        }
    })

    return (
        <Container>
            <form onSubmit={formik.handleSubmit}>
                <VStack
                minHeight="100vh"
                justifyContent="center">
                    <Heading>Sign Up</Heading>
                    <FormControl isInvalid={formik.errors.firstName !== undefined && formik.touched.firstName}>
                        <FormLabel>First Name</FormLabel>
                        <Input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.firstName}/>
                        <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.errors.lastName !== undefined && formik.touched.lastName}>
                        <FormLabel>Last Name</FormLabel>
                        <Input
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.lastName}/>
                        <FormErrorMessage>{formik.errors.lastName}</FormErrorMessage>
                    </FormControl>
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
                    <FormControl isInvalid={formik.errors.confirmPassword !== undefined && formik.touched.confirmPassword}>
                        <FormLabel>Password</FormLabel>
                        <Input
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirm Password"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.confirmPassword}/>
                        <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
                    </FormControl>
                    <ButtonGroup flexDirection="column" alignItems="center" gap="1rem">
                        <Button type="submit" variant="outline" width="100%">
                            Continue
                        </Button>
                        <Button variant="outline" width="100%">
                            Continue With Google
                        </Button>
                    </ButtonGroup>
                    <Text>Already have an account? <Link as={RouterLink} to="/login">Log in!</Link></Text>
                </VStack>
            </form>
        </Container>
    )
}
