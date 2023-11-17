import React from 'react';
import { Field, Former, FormData } from './react-former';
import FormerAddress from './FormerAddress';
import Card from './Card';

const App = () => {
    const customertypeenumArray = ['Supplier', 'Customer', 'Company'];
    // const validate = (formData: FormData) => {
    //     const errors: FormErrors = {};
    //     if (!formData.username) {
    //         errors.username = 'Kullanıcı adı gerekli.';
    //     }
    //     if (!formData.firstName) {
    //         errors.firstName = 'First Name is required';
    //     }
    //     return errors;
    // };

    // const fetchData = async () => {
    //     // Burada API isteğinizi yapın, örnek olarak sabit bir veri döndürülüyor
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve({ friends });
    //         }, 2000);
    //     });
    // };
    const createCustomer = async (data: FormData) => {
        console.log(data);
    };
    const [customerType, setCustomerType] = React.useState<string>('');

    console.log(customerType);
    const platforms = [
        { value: '1', label: 'Platform 1' },
        { value: '2', label: 'Platform 2' },
        { value: '3', label: 'Platform 3' },
    ];
    return (
        <Former onSubmit={createCustomer} className="flex flex-col gap-4">
            <Card title="Customer details">
                <div className="grid grid-cols-3 gap-4 mt-4">
                    <Field
                        setExternalState={setCustomerType}
                        name="Type"
                        label="Customer type*"
                        required
                        type={'select'}
                        options={customertypeenumArray.map((item) => ({
                            label: item,
                            value: item,
                        }))}
                    />
                    <Field
                        placeholder={'Customer Platform'}
                        name="AppInstallID"
                        options={platforms}
                        label="Customer platform*"
                        required
                        type={'select'}
                    />
                </div>
                <div className="bg-light-gray col-span-full grid grid-cols-2 gap-4 p-4 rounded-3xl">
                    <FormerAddress />
                </div>
            </Card>
            <button type={'submit'}>Submit</button>
        </Former>
    );
};

export default App;
