import styled from "styled-components";

import Link from "next/link";

import { BiRocket, BiUser } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";

import { BRAND } from "@/constants";

export const BrandLogo = () => (
  <StyledLink href="/" aria-label={"main"}>
    <NavContainer>
      <BiRocket className="navLogo" />
      <h4 className="navLogo_title">{BRAND.title}</h4>
    </NavContainer>
  </StyledLink>
);

export const MyProfileMenu = () => (
  <StyledLink
    href={"/myProfile"}
    aria-label={"myProfile"}
    style={{ textDecoration: "none" }}
  >
    <NavContainer>
      <BiUser />
      <span className="navitem_title">나의정보</span>
    </NavContainer>
  </StyledLink>
);

export const AdminMenu = () => (
  <StyledLink href="/admin" aria-label={"ADMIN"}>
    <NavContainer>
      <GrUserAdmin />
      <span className="navitem_title">관리자 메뉴</span>
    </NavContainer>
  </StyledLink>
);

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
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

