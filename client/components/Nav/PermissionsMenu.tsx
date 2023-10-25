import React from "react";
import useMyProfileManager from "../MyProfile/hooks/useMyProfileManager";
import styled from "styled-components";
import Link from "next/link";
import { GrUserAdmin } from "react-icons/gr";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { ModalProps } from "@/hooks/useModal";
import { useRouter } from "next/router";
import useLoginManager from "../Auth/hooks/useLoginManager";
import { AdminMenu, NavContainer } from "./MenuItems";
import { FlexBox } from "@/styles/GlobalStyle";

interface PermissionMenuProps {
  setModal: (modalProps: ModalProps) => void;
}

const PermissionsMenu = ({ setModal }: PermissionMenuProps) => {
  const { role } = useMyProfileManager();
  const { dispatchCheckOut } = useLoginManager();
  const router = useRouter();

  return (
    <Container>
      {role === "ADMIN" && <AdminMenu />}
      <NavContainer>
        {role === null ? (
          <LoginMenu>
            <BiLogIn onClick={() => router.push("/login")} />
            <span className="navitem_title">Login</span>
          </LoginMenu>
        ) : (
          <LogoutMenu>
            <BiLogOut
              onClick={() =>
                setModal({
                  onAction: dispatchCheckOut,
                  contents: {
                    title: "Message",
                    content: "정말 로그아웃을 원하시나요?",
                  },
                })
              }
            />
            <span className="navitem_title">LogOut</span>
          </LogoutMenu>
        )}
      </NavContainer>
    </Container>
  );
};

export default PermissionsMenu;
const Container = styled.div``;
const LoginMenu = styled.div``;
const LogoutMenu = styled.div`
  ${FlexBox};
  gap: 30px;
`;
