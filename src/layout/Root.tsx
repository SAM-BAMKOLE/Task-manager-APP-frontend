import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
// import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
    Box,
    Container,
    Flex,
    useBreakpointValue,
    useDisclosure,
    Text,
    Spacer,
    Button,
    IconButton,
    VStack,
    HStack,
    Collapse,
} from "@chakra-ui/react";
import { useEffect, useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { logoutHandle } from "../utils/handleAuth";
import { showToast } from "../utils/toast";
// import { User } from "../types/responseTypes";
// import { getUser } from "../utils/request";

export default function Root() {
    const { isOpen, onToggle } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
    const { authenticated, setAuthenticated, setTokensOnLoad } = useContext(AuthContext);
    // const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    async function handleLogout() {
        await logoutHandle();
        setAuthenticated(false);
        showToast("info", "User logged out");
        navigate("/auth/signin");
    }

    useEffect(() => {
        if (!authenticated) {
            (async () => {
                const res = await setTokensOnLoad();
                if (!res) navigate("/auth/signin");
            })();
        }
    });
    return (
        <>
            <Container maxW="container.xl" px={{ base: 5, md: 10 }}>
                {/* <Flex direction="column" align="center" justify="center" textAlign="center"> */}
                {/* Navbar */}
                <Flex
                    as="nav"
                    w="100%"
                    justify="space-between"
                    align={isMobile ? "initial" : "center"}
                    mb={8}
                    flexDirection={isMobile ? "column" : "row"}
                    position="relative"
                    p={4}>
                    <Box mb={isMobile && isOpen ? 10 : 0} as={isMobile ? HStack : "div"}>
                        <Text as={Link} to="/" size="lg" fontWeight="bold">
                            Task manager
                        </Text>

                        <Spacer />
                        <IconButton
                            aria-label={isOpen ? "CloseButton" : "OpenButton"}
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            display={isMobile ? "block" : "none"}
                            onClick={onToggle}
                        />
                    </Box>
                    {!isMobile ? (
                        <Box as={isMobile ? VStack : HStack} gap="3" alignItems="center">
                            <Button variant="ghost" onClick={handleLogout}>
                                Log out
                            </Button>
                        </Box>
                    ) : (
                        <Collapse in={isMobile && isOpen}>
                            <Button variant="outline" onClick={handleLogout}>
                                Log out
                            </Button>
                        </Collapse>
                    )}
                </Flex>
                <Outlet />
                {/* </Flex> */}
            </Container>
        </>
    );
}

/*
<IconButton

position={isMobile ? "absolute" : "static"}
                                top={isMobile ? "100%" : "auto"}
                                left={0}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        onClick={onToggle}
                        display={isMobile ? "block" : "none"}
                    />
                    <Collapse in={isOpen} animateOpacity>
                        <Flex
                            gap={4}
                            align="center"
                            w="100%"
                            p={4}
                            borderRadius="md"
                            boxShadow="md">
                            <Button variant="link" colorScheme="whiteAlpha">
                                Home
                            </Button>
                            <Button variant="link" colorScheme="whiteAlpha">
                                About
                            </Button>
                            <Button variant="link" colorScheme="whiteAlpha">
                                Services
                            </Button>
                            <Button variant="link" colorScheme="whiteAlpha">
                                Contact
                            </Button>
                        </Flex>
                    </Collapse>
                                
*/
