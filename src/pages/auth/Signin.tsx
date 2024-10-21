import { EmailIcon } from "@chakra-ui/icons";
import {
    Container,
    AbsoluteCenter,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Heading,
    Button,
    Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { signinHandle } from "../../utils/handleAuth";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { showToast } from "../../utils/toast";

export default function Signup() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const { setTokensAfterSignin } = useContext(AuthContext);
    const navigate = useNavigate();
    const redirectTo = useLocation();

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const res = await signinHandle(form);

        if (res && res.status === "success") {
            showToast(res.status, res.message);
            setTokensAfterSignin(res.data);
            navigate(redirectTo.state ? redirectTo.state : "/");
        } else {
            showToast(res?.status ?? "error", res?.message ?? "Something went wrong");
        }
    }
    return (
        <Container minH="100dvh">
            {/* <ToastContainer /> */}
            <AbsoluteCenter>
                <Heading textAlign={"center"} color="teal.500" mb="5">
                    Sign in
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <InputGroup>
                            <InputLeftAddon>
                                <EmailIcon color="gray.300" />
                            </InputLeftAddon>
                            <Input
                                variant="outline"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={form.email}
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                variant="outline"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={form.password}
                            />
                            <InputRightElement color="gray.300">
                                <Button size="xs" h="inherit">
                                    Show
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button colorScheme="teal" type="submit">
                            Signin
                        </Button>
                    </Stack>
                </form>
                <Text mt="4" size="sm">
                    Dont have an account yet?{" "}
                    <Text
                        ml="2"
                        as={Link}
                        variant="unstyled"
                        to="/auth/signup"
                        color="teal.400"
                        p="0">
                        Sign up
                    </Text>
                </Text>
            </AbsoluteCenter>
        </Container>
    );
}
