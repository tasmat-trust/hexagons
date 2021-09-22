import { Suspense } from "react";
import Loading from "../ui-globals/Loading";

export default function CustomSuspense({ message, children, ...other }) {
  return <Suspense fallback={<Loading message={message} {...other} />}>{children}</Suspense>
}