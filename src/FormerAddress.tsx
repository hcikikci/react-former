import React from 'react';
import Card from './Card';
import Button, { CircleButton } from './Button';

import { PrimaryModal } from './Modal';
import { Countries } from './Countries';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { addresstypeenumArray } from './Addresstypeenum';
import FieldArray from './react-former/former/FieldArray';
import Field from './react-former/former/Field';
import { TrashIcon } from '@heroicons/react/24/solid';

export const FormerAddress = () => {
    const [itemStates, setItemStates] = React.useState<any[]>([]);
    const updateItemState = (index: number, state: any) => {
        const updatedStates = [...itemStates];
        updatedStates[index] = state;
        setItemStates(updatedStates);
    };

    return (
        <FieldArray
            name={'address'}
            saveOnSubmit={true}
            itemStates={itemStates}
            updateItemState={updateItemState}
        >
            <div>
                <span className="text-sm mb-3 ml-9 mx-auto col-span-2 inline-flex space-x-1">
                    <FieldArray.Preview name={'Type'} /> <span>Address</span>
                </span>

                <Card
                    innerInnerClass={'flex flex-col space-y-2 shadow-none'}
                    className="text-xs  relative px-0"
                >
                    <FormerAddress.Edit
                        itemState={true}
                        updateItemState={true}
                    />
                    <FieldArray.Remove>
                        <CircleButton
                            className="group absolute top-3 right-14 bg-error hover:scale-110 hover:bg-error"
                            size="sm"
                            secondaryVariant="outline"
                            color="ghost"
                        >
                            <TrashIcon className="!w-3.5 !h-3.5 text-inherit text-white" />
                        </CircleButton>
                    </FieldArray.Remove>
                    <FieldArray.Preview name={'Company'} />
                    <div className="flex space-x-1">
                        <FieldArray.Preview name={'FirstName'} />{' '}
                        <FieldArray.Preview name={'LastName'} />
                    </div>
                    <FieldArray.Preview name={'Address'} />
                    <FieldArray.Preview name={'Address2'} />
                    <div className="flex space-x-1">
                        <span className="text-gray">Post Code:</span>
                        <FieldArray.Preview name={'PostalCode'} />,
                        <span className="text-gray">City:</span>
                        <FieldArray.Preview name={'City'} />,
                        <span className="text-gray">Country:</span>
                        <FieldArray.Preview name={'CountryCode'} />
                    </div>
                    <div className="flex flex-col space-y-2  pt-2">
                        <div className="flex space-x-1">
                            <span className="text-gray">Email:</span>{' '}
                            <FieldArray.Preview name={'Email'} />
                        </div>
                        <div className="flex space-x-1">
                            <span className="text-gray">Phone:</span>{' '}
                            <FieldArray.Preview name={'Phone'} />
                        </div>
                    </div>
                </Card>
                <Modal itemState={true} updateItemState={true}>
                    <span className="text-base font-medium mb-3 mx-auto col-span-2 inline-flex space-x-1">
                        <FieldArray.Preview name={'Type'} />{' '}
                        <span>Address</span>
                    </span>
                    <Field
                        customInitialValue={'Billing'}
                        name={'Type'}
                        label={'Address Type'}
                        placeholder="Address Type"
                        type={'select'}
                        options={addresstypeenumArray.map((item: any) => ({
                            label: item,
                            value: item,
                        }))}
                    />

                    <Field
                        name={'Company'}
                        label={'Company name'}
                        placeholder="Company BV"
                        type={'text'}
                    />
                    <Field
                        name={'FirstName'}
                        label={'Customer name*'}
                        placeholder="Name"
                        type={'text'}
                        required
                    />
                    <Field
                        name={'LastName'}
                        label={'Customer lastname*'}
                        placeholder="Lastname"
                        type={'text'}
                        required
                    />
                    <Field
                        name={'Address'}
                        label={'Address line 1*'}
                        placeholder="Address line 1"
                        type={'text'}
                        required
                    />
                    <Field
                        name={'Address2'}
                        label={'Address line 2'}
                        placeholder="Address line 2"
                        type={'text'}
                    />
                    <Field
                        name={'PostalCode'}
                        label={'Post code'}
                        placeholder="Post code"
                        type={'text'}
                    />
                    <Field
                        name={'City'}
                        label={'City*'}
                        placeholder="City"
                        type={'text'}
                        required
                    />
                    <Field
                        name={'CountryCode'}
                        label={'Country*'}
                        placeholder="Country"
                        type={'select'}
                        options={Countries.map((item) => ({
                            label: item.name.common,
                            value: item.cca2,
                        }))}
                        required
                    />
                    <Field
                        name={'District'}
                        label={'State'}
                        placeholder="State"
                        type={'text'}
                    />
                    <Field
                        name={'Phone'}
                        label={'Customer Phone*'}
                        placeholder="Phone"
                        type={'text'}
                        required
                    />
                    <Field
                        name={'Email'}
                        label={'Customer Email*'}
                        placeholder="Email"
                        type={'email'}
                        required
                    />
                    <FieldArray.Save
                        setItemStateAfterSave={{ showModal: false }}
                    >
                        <Button
                            type={'submit'}
                            size={'md'}
                            className="col-span-2 mx-auto mt-5 !px-8"
                            color="success"
                        >
                            Save
                        </Button>
                    </FieldArray.Save>
                </Modal>
            </div>
            <FieldArray.Add
                renderInLoop={false}
                initialItemState={{ showModal: true }}
            >
                <div className="flex flex-col h-full">
                    <span className="text-sm mb-3 ml-9 mx-auto col-span-2 inline-flex space-x-1">
                        {' '}
                        Address type
                    </span>
                    <FormerAddress.Add />
                </div>
            </FieldArray.Add>
        </FieldArray>
    );
};

const Modal = ({
    children,
    itemState,
    updateItemState,
}: {
    children?: any;
    itemState?: any;
    updateItemState?: any;
}) => {
    const closeModal = () => {
        console.log(updateItemState);
        updateItemState({ ...itemState, showModal: false });
    };

    return (
        <PrimaryModal
            onClose={() => closeModal()}
            open={itemState?.showModal}
            innerClassName="grid grid-cols-2 gap-x-5 gap-y-2"
            className="w-2/3 max-w-4xl"
            notCloseClickWithOutside={true}
        >
            {children}
        </PrimaryModal>
    );
};

const Add = () => {
    return (
        <Card
            className="h-full"
            innerInnerClass={
                'place-items-center flex flex-col space-y-4 h-full place-content-center'
            }
        >
            <div className="w-[80px] relative h-[80px] rounded-full bg-light-gray flex items-center place-content-center">
                <img width={60} height={60} src="/logo/logo.png" alt="logo" />
            </div>
            <Button
                className="text-white shadow rounded-clg px-8"
                size={'lg'}
                color="success"
            >
                Add address
            </Button>
        </Card>
    );
};

FormerAddress.Add = Add;

const Edit = ({
    itemState,
    updateItemState,
}: {
    itemState?: any;
    updateItemState?: any;
}) => {
    const showModal = () => {
        console.log(updateItemState);
        updateItemState({ ...itemState, showModal: true });
    };

    return (
        <CircleButton
            onClick={() => showModal()}
            className="group absolute top-3 right-4 bg-success hover:scale-110 hover:bg-success"
            size="sm"
            secondaryVariant="outline"
            color="ghost"
        >
            <PencilSquareIcon className="w-4 h-4 text-white" />
        </CircleButton>
    );
};

FormerAddress.Edit = Edit;

export default FormerAddress;
