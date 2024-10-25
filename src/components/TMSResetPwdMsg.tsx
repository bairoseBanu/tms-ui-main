import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import { FC } from "react";
interface Props {
  email: string;
}
const TMSResetPwdMsg: FC<Props> = ({ email }) => {
  return (
    <div>
      <Card
        sx={{
          width: 430,
          textAlign: "center",
          alignItems: "center",
          padding: 0.5,
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <CardMedia
          sx={{ height: 65, width: 65, alignContent: "center", margin: 5 }}
          image="https://imaginethatcreative.net/blog/wp-content/uploads/2023/06/2250206.png"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Reset your password
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, margin: 2 }}>
            We've sent a link to reset the password on your &nbsp;
            <Typography
              component={"span"}
              sx={{ fontSize: 14, textDecoration: "underline" }}
            >
              {email}
            </Typography>
            &nbsp; account.
          </Typography>
          <Typography variant="body2" sx={{ fontSize: 14, margin: 2 }}>
            If you no longer wish to change your password or did not initiate
            the request please disregard this email.
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default TMSResetPwdMsg;
