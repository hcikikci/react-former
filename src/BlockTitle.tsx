import React from 'react';

type BlockTitleProps = {
    title?: string;
    subtitle?: string | React.ReactNode;
    titleClass?: string;
    className?: string;
};

const BlockTitle = ({
    title,
    subtitle,
    titleClass,
    className,
}: BlockTitleProps) => {
    return (
        <div
            className={`flex flex-row border-l-4 border-l-success rounded-l-sm mb-2 ${className}`}
        >
            <div
                className={`flex flex-row items-center mx-10 border-b gap-4 w-full ${titleClass}`}
            >
                <h2 className="text-xs py-2 border-b-light-gray">{title}</h2>
                {typeof subtitle === 'string' ? (
                    <h3 className="text-gray text-sm">{subtitle}</h3>
                ) : (
                    subtitle
                )}
            </div>
        </div>
    );
};

export default BlockTitle;
