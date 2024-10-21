import { Container, Button, Heading, Input, Textarea, Stack } from "@chakra-ui/react";
import { addTask } from "../utils/handleTasks";
import { useContext, useState } from "react";
import { Task } from "../types/requestTypes";
import { AuthContext } from "../providers/AuthProvider";
import { showToast } from "../utils/toast";

export default function CreateTask() {
    const [task, setTask] = useState<Task>({ title: "", description: "", datetime: "" });
    const { token } = useContext(AuthContext);
    // const navigate = useNavigate();
    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setTask({ ...task, [e.target.name]: e.target.value });
    }
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const response = await addTask(task, token);

        // if (response.statusCode == 401) navigate("/auth/signin");

        showToast(response.status != "success" ? "error" : "success", response.message);

        if (response.status == "success") setTask({ title: "", description: "", datetime: "" });
    }
    return (
        <Container maxW="50rem">
            <Heading as="h1" mb="3">
                Add a new task!
            </Heading>
            <form onSubmit={handleSubmit}>
                <Stack spacing={3} direction="column">
                    <Input
                        placeholder="Task title"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />
                    <Textarea
                        placeholder="Task description.."
                        name="description"
                        value={task.description}
                        onChange={handleChange}></Textarea>
                    <Input
                        type="datetime-local"
                        name="datetime"
                        value={task.datetime}
                        onChange={handleChange}
                    />
                    <Button colorScheme="teal" type="submit">
                        Add task
                    </Button>
                </Stack>
            </form>
        </Container>
    );
}
