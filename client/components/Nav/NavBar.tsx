import styled from "styled-components";


import MainMenuItem from "./MainMenuItem";
import { BrandLogo, MyProfileMenu } from "./MenuItems";
import PermissionsMenu from "./PermissionsMenu";
import SwitchSlider from "../UI/SwitchSlider";
import { ColBox } from "@/styles/GlobalStyle";

import useModal from "@/hooks/useModal";

import { navItems } from "@/constants";

interface NavbarProps {
  toggleTheme: () => void;
  mode: boolean;
}

const Navbar = ({ toggleTheme, mode }: NavbarProps) => {
  const { Modal, setModal } = useModal();

  return (
    <NavStyle>
      <NavTop>
        <BrandLogo />
        <MainMenu>
          {navItems.map(({ title, path, icon }) => (
            <MainMenuItem key={title} title={title} path={path} icon={icon} />
          ))}
        </MainMenu>
      </NavTop>
      <NavBottom>
        <PermissionsMenu setModal={setModal} />
        <SwitchSlider isToggle={mode} onClick={toggleTheme} />
        <MyProfileMenu />
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
  min-width: 120px;
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
const NavTop = styled.div`
  display: flex;
  flex-direction: column;
`;

const NavBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const MainMenu = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 30px 15px;
  gap: 15px;
  @media screen and (max-width: 1200px) {
  }
`;
