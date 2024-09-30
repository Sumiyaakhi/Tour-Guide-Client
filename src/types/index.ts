import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface NavItem {
  href: string;
  label: string;
}

export interface SearchProps {
  placeholder: string;
  onSearch: (query: string) => void;
}
