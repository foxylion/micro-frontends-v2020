import * as React from "react";

export const createRemoteComponent: <T>(
  microfrontendName: string,
  module: string,
  component: string | undefined
) => React.FC<T> = (microfrontendName, module, component) => {
  const Component = React.lazy(async () => {
    // @ts-ignore
    await __webpack_init_sharing__("default");
    // @ts-ignore
    const defaultScope = __webpack_share_scopes__.default;
    const container = (window as any)[`microfrontend_${microfrontendName}`];
    await container.init(defaultScope);
    const factory = await container.get(module);
    const jsModule = factory();
    return { default: component ? jsModule[component] : jsModule };
  });

  return (props) => (
    <React.Suspense fallback="Loading System">
      <Component {...props} />
    </React.Suspense>
  );
};
