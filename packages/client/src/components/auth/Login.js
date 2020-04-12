import React from 'react'
import styled from "styled-components";
import { Formik } from "formik";
import * as Yup from "yup";

import Container from "@components/layout/Container";
import Subtitle from "@components/heading/Subtitle";
import Form from "@components/form/Form";
import Select from "@components/form/Select";
import Option from "@components/form/Option";
import Label from "@components/form/Label";
import Input from "@components/form/Input";
import Button from "@components/button/Button";
import Error from "@components/error/Error";

const FormContainer = styled.div`
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);

        ${Form} {
            display: flex;
            flex-direction: column;
        }
    `;

const ErrorContainer = styled.div`
        background: #ff3c4e;
        border-radius: 5px;
    `;

export default function Login() {
    return (
        <Container>
            <Subtitle>Collabratively draw on a canvas with your friends.</Subtitle>
            <FormContainer>
                <Formik
                    initialValues={{
                        name: "",
                        room: ""
                    }} 
                    onSubmit={async values => {
                        console.log(values);
                    }}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required("Name is required!"),
                        room: Yup.string().required("Room is required!")
                    })}
                >
                    {props => {
                        const {
                            values,
                            touched,
                            errors,
                            isSubmitting,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                        } = props;

                    return (
                        <Form onSubmit={handleSubmit} >
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Enter Name"
                                type="text"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={
                                    errors.name && touched.name ? "input--error" : ""
                                }
                            />
                            <Label htmlFor="room">Room</Label>
                            <Select
                                required
                                id="rooms"
                                name="room"
                                value={values.room}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <Option value="">Select a room</Option>
                                <Option value="test-room">Test Room</Option>
                                <Option value="test-room2">Test Room 2</Option>
                                <Option value="test-room3">Test Room 3</Option>
                            </Select>
                            <Button type="submit" disabled={isSubmitting}>Login</Button>
                            {errors &&
                                <ErrorContainer>
                                    {Object.values(errors).map(error => (
                                        <Error>{error}</Error>
                                    ))}
                                </ErrorContainer>
                            }
                        </Form>
                    )
                    }}
                </Formik>
            </FormContainer>
        </Container>
    )
}
