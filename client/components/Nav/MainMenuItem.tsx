import Link from "next/link";
import React, { ReactElement } from "react";
import styled from "styled-components";

interface MainMenuItemProps {
  title: string;
  path: string;
  icon: React.ReactNode;
}

const MainMenuItem = ({ title, path, icon }: MainMenuItemProps) => {
  return (
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
  );
};

export default MainMenuItem;

const NavItem = styled.li`
  list-style: none;
  opacity: 0.8;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
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
