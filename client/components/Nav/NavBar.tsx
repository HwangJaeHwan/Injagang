import styled from "styled-components";
import Link from "next/link";
import { useState, ReactElement } from "react";
import { BiSun, BiRocket, BiMoon, BiLogOut, BiLogIn } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { RootReducerType } from "@/components/redux/store";
import { useSelector } from "react-redux";
import { InitiaState } from "../redux/Auth/reducer";
const NavStyle = styled.nav`
  position: fixed;
  height: 100%;
  width: 20%;
  padding: 40px 10px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.5s ease-in-out;
  overflow: hidden;
  border-right: 0.5px solid rgba(236, 225, 225, 0.904);
  @media screen and (max-width: 768px) {
  }
  svg {
    font-size: 2.5rem;
    color: ${({ theme }) => theme.colors.text};
  }
`;
const NavTop = styled.div`
  cursor: pointer;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const NavMenu = styled.ul`
  margin: 30px 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: 20px;
  @media screen and (max-width: 768px) {
  }
`;

const NavItem = styled.li`
  list-style: none;
  opacity: 0.8;
  @media screen and (max-width: 768px) {
  }
  &:hover {
    color: ${({ theme }) => theme.colors.black};
    svg {
      color: ${({ theme }) => theme.colors.black};
    }
  }
`;

const NavLink = styled.div`
  color: ${({ theme }) => theme.colors.text};
  .brand-logo {
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 28px;
  }

  .brand-logo svg {
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.logo};
  }
  .navitem-cotainer {
    display: flex;
    align-items: center;
    gap: 30px;
  }
  .navitem-cotainer:hover {
    background-color: #2365b1;
    opacity: 0.8;
  }

  @media screen and (max-width: 768px) {
    &:hover {
    }
    .navitem-title,
    .brand-logo h4 {
      display: none;
    }
    .brand-logo svg {
      font-size: 3rem;
    }
  }
`;
const NavBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  cursor: pointer;
`;

interface MenuItem {
  title: string;
  path: string;
  icon: ReactElement;
}

interface NavbarProps {
  items: MenuItem[];
  toggleTheme: () => void;
  mode: boolean;
}

const Navbar = ({ items, toggleTheme, mode }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const authReducer: InitiaState = useSelector(
    (state: RootReducerType) => state.auth,
  );
  return (
    <NavStyle>
      <NavTop>
        <StyledLink href="/">
          <NavLink>
            <div className="brand-logo">
              <BiRocket />
              <h4>InJaGang</h4>
            </div>
          </NavLink>
        </StyledLink>
        <NavMenu>
          {items.map(({ title, path, icon }) => (
            <NavItem key={title}>
              <StyledLink href={path} style={{ textDecoration: "none" }}>
                <NavLink>
                  <div className="navitem-cotainer">
                    <i className="navitem-icon">{icon}</i>
                    <span className="navitem-title">{title}</span>
                  </div>
                </NavLink>
              </StyledLink>
            </NavItem>
          ))}
        </NavMenu>
      </NavTop>
      <NavBottom>
        {authReducer.rule === "admin" && (
          <StyledLink href="/admin">
            <GrUserAdmin />
          </StyledLink>
        )}
        {mode === true ? <BiLogIn /> : <BiLogOut />}
        {mode === true ? (
          <BiSun onClick={toggleTheme} />
        ) : (
          <BiMoon onClick={toggleTheme} />
        )}
      </NavBottom>
    </NavStyle>
  );
};

export default Navbar;
