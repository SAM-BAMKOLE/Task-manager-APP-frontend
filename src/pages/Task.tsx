import { useEffect, useState } from "react";
import { TaskType } from "../types/taskTypes";
import { Box, Button, Divider, Flex, Heading, Spacer, Tag, Text } from "@chakra-ui/react";
import { getTask } from "../utils/handleTasks";
import { Link, useParams } from "react-router-dom";

export default function Task() {
    const [task, setTask] = useState<TaskType>({});
    const { id } = useParams();

    async function fetchTask() {
        const res = await getTask(id!);
        setTask(res.data!);
    }
    useEffect(() => {
        fetchTask();
    }, []);
    return (
        <Box>
            <Flex mb={2}>
                <Spacer />
                <Button colorScheme="teal" as={Link} to="/task">
                    Tasks
                </Button>
            </Flex>
            <Heading as="h1">{task.title}</Heading>
            <Text my={2}>{task.description}</Text>
            <Text>
                <Tag colorScheme="teal" mr="2">
                    Deadline:
                </Tag>
                {new Date(task.datetime).toLocaleString()}
            </Text>
            <Divider my={4} />
            <Tag
                colorScheme={
                    task.status == "PENDING"
                        ? "blue"
                        : task.status == "UNCOMPLETED"
                        ? "red"
                        : "green"
                }>
                {task.status}
            </Tag>
        </Box>
    );
}
