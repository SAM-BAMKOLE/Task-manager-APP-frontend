import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export const Home = () => {
    const { user } = useContext(AuthContext);
    return (
        <Flex
            alignItems="center"
            minH="60dvh"
            pb="10"
            px="10"
            bgGradient="linear(to-br, teal.100, green.100, blue.200)">
            <Box>
                {/* Hero Text */}
                <Heading as="h1" size="2xl" mb={2} textTransform="capitalize">
                    {user && `Hello ${user.firstname},`} Welcome to Taskmanager
                </Heading>
                <Heading as="h3" fontWeight="500" size="md" mb={6}>
                    Your gateway to amazing experiences
                </Heading>

                {/* Buttons */}
                <Stack spacing={4} direction={{ base: "column", md: "row" }}>
                    <Button as={Link} to="/task" colorScheme="teal" size={{ base: "md", md: "lg" }}>
                        View your tasks
                    </Button>
                    <Button variant="outline" colorScheme="teal" size={{ base: "md", md: "lg" }}>
                        Learn More
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
};
