import { EmailIcon } from "@chakra-ui/icons";
import {
    Container,
    AbsoluteCenter,
    Stack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightElement,
    Button,
    Heading,
    Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signupHandle } from "../../utils/handleAuth";
import { showToast } from "../../utils/toast";

export default function Signup() {
    const [form, setForm] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await signupHandle(form);
        if (response.status == "success") {
            showToast("success", response.message);
            navigate("/auth/signin");
        } else {
            showToast("error", response.message);
        }
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    return (
        <Container minH="100dvh">
            <AbsoluteCenter>
                <Heading textAlign={"center"} color="teal.500" mb="5">
                    Sign up
                </Heading>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <Input
                            variant="outline"
                            placeholder="Firstname"
                            name="firstname"
                            value={form.firstname}
                            onChange={handleChange}
                        />
                        <Input
                            variant="outline"
                            placeholder="Lastname"
                            name="lastname"
                            value={form.lastname}
                            onChange={handleChange}
                        />
                        <InputGroup>
                            <InputLeftAddon>
                                <EmailIcon color="gray.300" />
                            </InputLeftAddon>
                            <Input
                                variant="outline"
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                type="email"
                            />
                        </InputGroup>
                        <InputGroup>
                            <Input
                                variant="outline"
                                placeholder="Password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                type="password"
                            />
                            <InputRightElement color="gray.300">
                                <Button size="xs" h="inherit">
                                    Show
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <InputGroup>
                            <Input
                                variant="outline"
                                placeholder="Confirm Password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                type="password"
                            />
                            <InputRightElement color="gray.300">
                                <Button size="xs" h="inherit">
                                    Show
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button colorScheme="teal" type="submit">
                            Signup
                        </Button>
                    </Stack>
                </form>
                <Text mt="4" size="sm">
                    Already have an account ?{" "}
                    <Text
                        ml="2"
                        as={Link}
                        variant="unstyled"
                        to="/auth/signin"
                        color="teal.400"
                        p="0">
                        Sign in
                    </Text>
                </Text>
            </AbsoluteCenter>
        </Container>
    );
}
