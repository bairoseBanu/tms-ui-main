import {
  red,
  blue,
  pink,
  orange,
  deepOrange,
  purple,
  deepPurple,
  indigo,
  lightBlue,
  blueGrey,
  teal,
  cyan,
} from "@mui/material/colors";

export function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export function stringAvatar(name = "John Doe") {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0].toUpperCase()}${name
      .split(" ")[1][0]
      .toUpperCase()}`,
  };
}

export function lightenColor() {
  const colors = [
    red[50],
    blue[50],
    pink[50],
    orange[50],
    deepOrange[50],
    purple[50],
    deepPurple[50],
    indigo[50],
    lightBlue[50],
    blueGrey[50],
    teal[50],
    cyan[50],
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}
