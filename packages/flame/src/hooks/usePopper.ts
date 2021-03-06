import * as React from 'react';
import PopperJs, { PopperOptions, Data } from 'popper.js';

export function usePopper(
  targetRef: React.RefObject<any>,
  popperRef: React.RefObject<any>,
  options: PopperOptions = { placement: 'bottom' },
) {
  const [placement, setPlacement] = React.useState(options.placement);

  React.useLayoutEffect(() => {
    let popperInstance: PopperJs | null = null;
    if (targetRef.current && popperRef.current && !popperInstance) {
      popperInstance = new PopperJs(targetRef.current, popperRef.current, {
        ...options,
        onCreate: (data: Data) => {
          if (placement !== data.placement) {
            setPlacement(data.placement);
          }
          if (options.onCreate) {
            options.onCreate(data);
          }
        },
        onUpdate: (data: Data) => {
          if (placement !== data.placement) {
            setPlacement(data.placement);
          }
          if (options.onUpdate) {
            options.onUpdate(data);
          }
        },
      });
    }
    return () => {
      popperInstance && popperInstance.destroy();
      popperInstance = null;
    };
  }, [targetRef.current, popperRef.current, placement]);

  return {
    placement,
  };
}
