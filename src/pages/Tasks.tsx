import {
    Card,
    Text,
    CardHeader,
    Box,
    Heading,
    SimpleGrid,
    GridItem,
    CardBody,
    CardFooter,
    Tag,
    Button,
} from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useLoaderData } from "react-router-dom";
import { FetchResponse } from "../types/responseTypes";

// interface Props {}

export default function Tasks() {
    const { user } = useContext(AuthContext);
    const response: FetchResponse = useLoaderData();

    // useEffect(() => {
    //     if (response && response.status != "success") showToast("error", response.message);
    // }, []);

    return (
        <Box w="full">
            <Heading textTransform="capitalize" color="teal.700">
                {user && user.firstname}'s tasks
            </Heading>
            <Button colorScheme="teal" as={Link} to="/task/create" size="md" ml="auto" my={3}>
                Add new task
            </Button>
            <Box bgColor="gray.50" p="3" mt="6" rounded="md">
                {(response && response.status == "error") || response.data?.length < 1 ? (
                    <Text>You don't have any tasks</Text>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap="3">
                        {response.data!.map((task) => (
                            <GridItem key={task._id}>
                                <Card h="100%">
                                    <CardHeader
                                        as="h4"
                                        noOfLines={1}
                                        fontWeight="600"
                                        fontSize="x-large"
                                        color="teal.600">
                                        <Text
                                            as={Link}
                                            to={`/task/${task._id}`}
                                            _hover={{ textDecoration: "underline" }}>
                                            {task.title}
                                        </Text>
                                    </CardHeader>
                                    <CardBody>
                                        <Text noOfLines={3}>{task.description}</Text>
                                    </CardBody>
                                    <CardFooter>
                                        <Tag mr={3} colorScheme="teal">
                                            Deadline:
                                        </Tag>
                                        <Text>{new Date(task.datetime).toLocaleString()}</Text>
                                    </CardFooter>
                                </Card>
                            </GridItem>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </Box>
    );
}
