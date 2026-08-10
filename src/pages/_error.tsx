import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <h1 style={{ fontWeight: 500, fontSize: "1.5rem" }}>
        {statusCode ? `${statusCode} — An error occurred` : "An error occurred"}
      </h1>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
