import { Icon, type IconProps } from '@iconify/react';

/** * Set icon from iconify/react in `<Icon/>` component. */
const IconifyIcon = ({ ...props }: IconProps) => {
	return <Icon {...props} />;
};

export default IconifyIcon;
