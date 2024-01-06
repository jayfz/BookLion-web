import { useLogin } from "@/auth/useLogin";
import GoogleSvg from "@/ui/GoogleSvg";
import { ChangeEvent, MouseEventHandler, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import styled from "styled-components";

const LoginBox = styled.article`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 20px;

    --bl-input-background: #f5f5f5;
    --bl-text-gray: #606060;
    --bl-link-unvisted: #5753ff;
    --bl-brand: #77adff;
    --bl-border: #ebebeb;
`;

const Title = styled.h1`
    font-size: 1.5rem;
`;

const ActionLink = styled(Link)`
    color: #5753ff;
`;

type FlexContainer = {
    $direction?: "column" | "row";
    $gap: string;
};

const LoginBlock = styled.div<FlexContainer>`
    display: flex;
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
        <LoginBox>
            <LoginBlock $gap="0.5rem">
                <Title>Welcome to BookLion</Title>
                <p>
                    Don't have an account? <ActionLink to="/signup">Sign up</ActionLink>
                </p>
            </LoginBlock>
            <LoginBlock $gap="0.5rem" as="form">
                <InputBox
                    placeholder="Email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={onEmailChange}
                />
                <InputBox
                    placeholder="Password"
                    type="password"
                    value={password}
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
        </LoginBox>
    );
}
