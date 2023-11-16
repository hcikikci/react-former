import React from 'react';
import BlockTitle from './BlockTitle';

type CardProps = {
    title?: string;
    subtitle?: string | React.ReactNode;
    children: React.ReactNode;
    className?: string;
    innerBorder?: boolean;
    innerClass?: string;
    titleClass?: string;
    innerInnerClass?: string;
    isLoading?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const Card = ({
    title,
    subtitle,
    children,
    className,
    innerBorder,
    innerClass,
    titleClass,
    innerInnerClass,
    isLoading,
    ...props
}: CardProps) => {
    return (
        <div
            {...props}
            className={`bg-white rounded-csm p-6 shadow w-full relative ${className} ${
                isLoading ? 'relative opacity-40' : ''
            }`}
        >
            {isLoading && (
                <div
                    className="absolute left-1/2 -ml-6 top-1/2 -mt-6 inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-purple border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            )}
            <div
                className={` h-full ${
                    innerBorder && 'border rounded-csm p-4'
                } ${innerClass}`}
            >
                {title && (
                    <BlockTitle
                        title={title}
                        subtitle={subtitle}
                        titleClass={titleClass}
                    />
                )}
                <div className={`px-10 ${innerInnerClass}`}>{children}</div>
            </div>
        </div>
    );
};

export default Card;
