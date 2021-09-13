import { Suspense } from "react";
import Loading from "../ui-globals/Loading";

export default function CustomSuspense({ message, children }) {
  return <Suspense fallback={<Loading message={message} />}>{children}</Suspense>
}