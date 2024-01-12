import { useLogin } from "@/auth/useLogin";
import BookLionQuicksandLightLogo from "@/ui/BookLionQuicksandLightLogo";
import GoogleSvg from "@/ui/GoogleSvg";
import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginPageContainer = styled.article`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding: 1rem;
    align-items: center;
    margin: auto 0;
`;

const LoginContent = styled.article`
    background-color: white;
    border-radius: 1rem;
    gap: 0.5rem;
    padding: 1rem;
    display: flex;
    margin: auto 0;
    flex-direction: column;
`;

const Title = styled.h1`
    font-size: 1.5rem;
`;

const ActionLink = styled(Link)`
    color: var(--bl-link-unvisted);
`;

type FlexContainer = {
    $direction?: "column" | "row";
    $gap: string;
};

const LoginBlock = styled.div<FlexContainer>`
    display: flex;
    padding: 0.5rem 0;

    flex-direction: ${(props) => (props.$direction ? props.$direction : "column")};
    gap: ${(props) => (props.$gap ? props.$gap : "0.5rem")};
`;

const InputBox = styled.input`
    width: 100%;
    height: 3rem;
    padding: 1rem;
    background-color: var(--bl-input-background);
    color: var(--bl-text-gray);
    border-radius: 0.5rem;
`;

const Button = styled.button`
    height: 3rem;
    width: 100%;
    border-radius: 0.5rem;
    background: var(--bl-brand);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 700;
    line-height: normal;
`;

const GoogleLoginButton = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 2.25rem;
    gap: 0.625rem;
    border-radius: 0.5rem;
    border: 1px solid var(--bl-border);
`;

const Separator = styled.div`
    display: flex;
    align-items: center;
    height: 1.5rem;
    margin: 0.5rem 0;
`;

const Hr = styled.hr`
    width: 100%;
    height: 0.125rem;
    border: 1px solid var(--bl-border);
    border-radius: 999rem;
`;

const Or = styled.p`
    padding: 0rem 1rem;
    color: var(--bl-text-gray);
`;

const PrivacyPolicy = styled.p`
    padding: 1rem 0rem;
    color: var(--bl-text-gray);
`;

export default function LoginPage() {
    const [email, setEmail] = useState("carlos.bacca@gmail.com");
    const [password, setPassword] = useState("123");
    const { login, isLoggingIn } = useLogin();
    const toastId = useRef<string | null>(null);

    const onEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onLoginClick: MouseEventHandler = (event) => {
        event.preventDefault();
        login({ email, password });
        toastId.current = toast.loading("Logging in...");
    };

    useEffect(() => {
        if (toastId.current != null && !isLoggingIn) {
            toast.dismiss(toastId.current);
            toastId.current = null;
        }

        return () => {
            if (toastId.current) {
                toast.dismiss(toastId.current);
                toastId.current = null;
            }
        };
    }, [isLoggingIn]);

    return (
        <LoginPageContainer>
            <LoginContent>
                <BookLionQuicksandLightLogo
                    fill={"var(--bl-brand)"}
                    size={"2rem"}
                    style={{ alignSelf: "center", margin: "1rem 0" }}
                />
                <LoginBlock $gap="0.5rem">
                    <Title>Welcome</Title>
                    <p>
                        Don't have an account? <ActionLink to="/signup">Sign up</ActionLink>
                    </p>
                </LoginBlock>
                <LoginBlock $gap="0.5rem" as="form" name="login-form">
                    <InputBox
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        name="email"
                        onChange={onEmailChange}
                    />
                    <InputBox
                        placeholder="Password"
                        type="password"
                        value={password}
                        name="password"
                        autoComplete="current-password"
                        onChange={onPasswordChange}
                    />
                    <Button onClick={onLoginClick}>Login</Button>
                    <ActionLink style={{ alignSelf: "end" }} to="/reset-password">
                        Forgot your password?
                    </ActionLink>
                </LoginBlock>
                <Separator>
                    <Hr />
                    <Or>Or</Or>
                    <Hr />
                </Separator>
                <GoogleLoginButton>
                    <GoogleSvg />
                    <p>Continue with Google</p>
                </GoogleLoginButton>
                <PrivacyPolicy>
                    By continuing, you agree to Book Lion’s <ActionLink to="/terms-of-use">Terms of Use</ActionLink> and{" "}
                    <ActionLink to="/privacy-policy"> Privacy Policy</ActionLink>
                </PrivacyPolicy>
            </LoginContent>
        </LoginPageContainer>
    );
}
