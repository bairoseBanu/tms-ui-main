import { Icon, Menu } from "@mui/material";
import NotificationItem from "examples/Items/NotificationItem";
import { FC } from "react";
import { Link } from "react-router-dom";
type HandleClick = (event: React.MouseEvent<HTMLAnchorElement>) => void;
type Item = {
  src: string;
  iconName: string;
  title: string;
  handleClick?: HandleClick;
};
interface Props {
  open: Element | null;
  handleClose: () => void;
  menuItems: Item[];
}

const TMSMenu: FC<Props> = ({ open, handleClose, menuItems }) => {
  return (
    <Menu
      anchorEl={open}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(open)}
      onClose={handleClose}
      sx={{ mt: 2 }}
    >
      {menuItems.map(({ src, iconName, title, handleClick }, index) => {
        return (
          <Link key={index} to={src} onClick={handleClick}>
            <NotificationItem icon={<Icon>{iconName}</Icon>} title={title} />
          </Link>
        );
      })}
    </Menu>
  );
};

export default TMSMenu;
