import React from 'react';
import {
    ErrorMessage,
    Field,
    FieldArray,
    Former,
    FormErrors,
    FormData,
} from './react-former';

const App = () => {
    const friends = [
        { name: 'John', age: 20 },
        { name: 'Jane', age: 30, id: 1 },
        { name: 'Jack', age: 40 },
    ];

    const validate = (formData: FormData) => {
        const errors: FormErrors = {};
        if (!formData.username) {
            errors.username = 'Kullanıcı adı gerekli.';
        }
        if (!formData.firstName) {
            errors.firstName = 'First Name is required';
        }
        return errors;
    };

    const fetchData = async () => {
        // Burada API isteğinizi yapın, örnek olarak sabit bir veri döndürülüyor
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ friends });
            }, 2000);
        });
    };

    return (
        <div className="flex flex-col">
            <Former
                validate={validate}
                initialData={fetchData()}
                className="bg-gray-100 grid grid-cols-2 gap-10 p-10 m-10  shadow"
                onSubmit={(data) => console.log(data)}
            >
                <div>
                    <Field
                        name={'username'}
                        type={'text'}
                        label={'Username'}
                        required
                    />
                    <ErrorMessage fieldName={'username'} />
                </div>
                <Field name={'firstName'} type={'text'} label={'First Name'} />
                <ErrorMessage fieldName={'firstName'} />
                <Field name={'lastName'} type={'text'} label={'Last Name'} />
                <Field name={'age'} type={'text'} label={'Age'} required />
                <Field
                    name={'gender'}
                    type={'select'}
                    label={'Gender'}
                    options={[
                        { label: 'Male', value: 'Male' },
                        { label: 'Female', value: 'Female' },
                    ]}
                    customInitialValue={{
                        label: 'Valemale',
                        value: 'Valemale',
                    }}
                />

                <FieldArray name={'friends'}>
                    <div>
                        <FieldArray.Preview name={'name'} />
                        <Field
                            name={`name`}
                            type={'text'}
                            label={'Friend Name'}
                        />
                        <Field
                            name={`age`}
                            type={'text'}
                            label={'Friend Age'}
                        />
                        <Field
                            name={`deneme`}
                            type={'text'}
                            label={'Friend Deneme'}
                        />
                        <FieldArray.Remove>
                            <button type={'button'}>Remove Friend</button>
                        </FieldArray.Remove>
                    </div>

                    <FieldArray.Add renderInLoop={false}>
                        <button type={'button'}>Add Friend</button>
                    </FieldArray.Add>
                </FieldArray>
                <button
                    type={'submit'}
                    className="bg-black text-white px-8 py-1 mx-auto w-fit rounded-3xl"
                >
                    Submit
                </button>
            </Former>
        </div>
    );
};

export default App;
