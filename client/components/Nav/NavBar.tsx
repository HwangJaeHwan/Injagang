import { useState } from "react";
import styled from "styled-components";
import { BiRocket, BiLogOut, BiLogIn, BiUser } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/router";

import { ColBox } from "@/styles/GlobalStyle";
import { navItems } from "@/constants";
import SwitchSlider from "../UI/SwitchSlider";
import useModal from "@/hooks/useModal";
import useLoginManager from "../Auth/hooks/useLoginManager";
import useMyProfileManager from "../MyProfile/hooks/useMyProfileManager";

interface NavbarProps {
  toggleTheme: () => void;
  mode: boolean;
}

const Navbar = ({ toggleTheme, mode }: NavbarProps) => {
  const { Modal, setModal } = useModal();
  const router = useRouter();
  const { role } = useMyProfileManager();
  const { dispatchCheckOut } = useLoginManager();

  const handleCheckOut = () => {
    dispatchCheckOut();
    return;
  };

  return (
    <NavStyle>
      <NavTop>
        <StyledLink href="/" aria-label={"main"}>
          <NavLink>
            <NavContainer>
              <BiRocket className="navLogo" />
              <h4 className="navLogo_title">InJaGang</h4>
            </NavContainer>
          </NavLink>
        </StyledLink>
        <NavMenu>
          {navItems.map(({ title, path, icon }) => (
            <NavItem key={title}>
              <StyledLink
                href={path}
                aria-label={title}
                style={{ textDecoration: "none" }}
              >
                <NavLink>
                  <NavContainer>
                    <i className="navitem_icon">{icon}</i>
                    <span className="navitem_title">{title}</span>
                  </NavContainer>
                </NavLink>
              </StyledLink>
            </NavItem>
          ))}
        </NavMenu>
      </NavTop>

      <NavBottom>
        {role === "ADMIN" && (
          <StyledLink href="/admin" aria-label={"ADMIN"}>
            <GrUserAdmin />
          </StyledLink>
        )}
        <NavContainer>
          {role === null ? (
            <>
              <BiLogIn onClick={() => router.push("/login")} />
              <span className="navitem_title">Login</span>
            </>
          ) : (
            <>
              <BiLogOut
                onClick={() =>
                  setModal({
                    onAction: handleCheckOut,
                    contents: {
                      title: "Message",
                      content: "정말 로그아웃을 원하시나요?",
                    },
                  })
                }
              />
              <span className="navitem_title">LogOut</span>
            </>
          )}
        </NavContainer>

        <NavContainer>
          {/* <BiSun onClick={toggleTheme} />
            <BiMoon onClick={toggleTheme} /> */}
          <SwitchSlider isToggle={mode} onClick={toggleTheme} />
        </NavContainer>
        <NavContainer>
          <StyledLink
            href={"/myProfile"}
            aria-label={"myProfile"}
            style={{ textDecoration: "none" }}
          >
            <NavLink>
              <NavContainer>
                <BiUser></BiUser>
                <span className="navitem_title">나의정보</span>
              </NavContainer>
            </NavLink>
          </StyledLink>
        </NavContainer>
      </NavBottom>
      <Modal />
    </NavStyle>
  );
};

export default Navbar;

const NavStyle = styled.nav`
  ${ColBox}
  position: fixed;
  justify-content: space-between;
  height: 100%;
  width: 300px;
  min-width: 100px;
  padding: 40px 10px;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.5s ease;
  overflow: hidden;
  border-right: 0.5px solid rgba(236, 225, 225, 0.904);
  font-family: "Noto Sans KR", sans-serif;

  svg {
    font-size: 2.5rem;
  }

  @media screen and (max-width: 1200px) {
    width: 100px;
    svg {
      &:hover {
        color: ${({ theme }) => theme.colors.black};
      }
    }
  }
`;
const NavTop = styled.div``;

const NavBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavMenu = styled.ul`
  margin: 30px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media screen and (max-width: 1200px) {
  }
`;

const NavItem = styled.li`
  list-style: none;
  opacity: 0.8;
`;

const NavLink = styled.div`
  color: ${({ theme }) => theme.colors.text};
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  width: 230px;
  gap: 30px;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #2365b1;
    opacity: 0.8;
  }
  .navLogo {
    font-size: 3.5rem;
  }
  .navLogo_title {
    font-size: 28px;
    color: RGB(255, 0, 0);
  }

  @media screen and (max-width: 1200px) {
    width: 100%;
    &:hover {
    }
    .navitem_title,
    .navLogo_title {
      display: none;
    }
    .navLogo {
      font-size: 3rem;
    }
  }
`;
