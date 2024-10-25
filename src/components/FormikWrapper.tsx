import { Formik, Form, FormikProps } from "formik";
import { ReactNode } from "react";
interface props<T> {
  initialValues: T;
  validationSchema: unknown;
  onSubmit: (args: T) => void;
  children?: ReactNode;
  component?: React.ComponentType<FormikProps<T>>;
  onFormikProps?: (props: FormikProps<T>) => void;
}
const FormikWrapper = <T extends object>({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  component,
  onFormikProps,
}: props<T>) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      component={component}
    >
      {(props) => {
        if (onFormikProps) {
          onFormikProps(props);
        }
        return <Form>{children}</Form>;
      }}
    </Formik>
  );
};

export default FormikWrapper;
