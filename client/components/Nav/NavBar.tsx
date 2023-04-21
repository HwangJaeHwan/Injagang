import styled from "styled-components";
import Link from "next/link";
import { useState, ReactElement, useEffect } from "react";
import {
  BiSun,
  BiRocket,
  BiMoon,
  BiLogOut,
  BiLogIn,
  BiUser,
} from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import { InitiaState } from "../redux/Auth/reducer";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { checkOut } from "../redux/Auth/actions";
import { ColBox, FlexBox } from "@/styles/GlobalStyle";
import Modal from "../UI/Modal";
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
  }
  svg {
    &:hover {
      color: ${({ theme }) => theme.colors.black};
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

interface MenuItem {
  title: string;
  path: string;
  icon: ReactElement;
}

interface NavbarProps {
  navitems: MenuItem[];
  toggleTheme: () => void;
  mode: boolean;
}

const Navbar = ({ navitems, toggleTheme, mode }: NavbarProps) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const authReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.auth,
  );

  const handleCheckOut = () => {
    dispatch(checkOut());
    setIsOpenModal(false);
    return;
  };

  return (
    <NavStyle>
      <NavTop>
        <StyledLink href="/">
          <NavLink>
            <NavContainer>
              <BiRocket className="navLogo" />
              <h4 className="navLogo_title">InJaGang</h4>
            </NavContainer>
          </NavLink>
        </StyledLink>
        <NavMenu>
          {navitems.map(({ title, path, icon }) => (
            <NavItem key={title}>
              <StyledLink href={path} style={{ textDecoration: "none" }}>
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
        {authReducer.role === "ADMIN" && (
          <StyledLink href="/admin">
            <GrUserAdmin />
          </StyledLink>
        )}
        <NavContainer>
          {authReducer.role === "" ? (
            <>
              <BiLogIn onClick={() => router.push("/login")} />
              <span className="navitem_title">Login</span>
            </>
          ) : (
            <>
              <BiLogOut onClick={() => setIsOpenModal(true)} />
              <span className="navitem_title">LogOut</span>
            </>
          )}
        </NavContainer>
        <NavContainer>
          {mode === true ? (
            <BiSun onClick={toggleTheme} />
          ) : (
            <BiMoon onClick={toggleTheme} />
          )}
        </NavContainer>
        <NavContainer>
          <BiUser onClick={() => router.push("/myPage")}></BiUser>
          <span className="navitem_title">나의정보</span>
        </NavContainer>
      </NavBottom>
      <Modal
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(!isOpenModal)}
        onAction={handleCheckOut}
        contents={{ title: "MSG", content: "정말 로그아웃을 원하시나요?" }}
      />
    </NavStyle>
  );
};

export default Navbar;
