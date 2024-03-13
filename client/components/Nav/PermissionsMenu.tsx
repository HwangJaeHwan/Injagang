import React from "react";

import styled from "styled-components";

import { useRouter } from "next/router";

import { BiLogOut, BiLogIn } from "react-icons/bi";

import { AdminMenu, NavContainer } from "./MenuItems";

import { ModalProps } from "@/hooks/useModal";
import useLoginManager from "../Auth/hooks/useLoginManager";
import useMyProfileManager from "../MyProfile/hooks/useMyProfileManager";

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
          <LogMenu>
            <BiLogIn onClick={() => router.push("/login")} />
            <span className="navitem_title">Login</span>
          </LogMenu>
        ) : (
          <LogMenu>
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
          </LogMenu>
        )}
      </NavContainer>
    </Container>
  );
};

export default PermissionsMenu;
const Container = styled.div``;
const LogMenu = styled.div`
  ${FlexBox}
  gap: 30px;
`;
