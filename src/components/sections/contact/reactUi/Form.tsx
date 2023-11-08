import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

import styles from './form.module.scss';

const schema = z.object({
	name: z.string().min(1, { message: 'Name is required' }),
	email: z.string().email({ message: 'Invalid email address' }),
	subject: z.string().min(1, { message: 'Subject is required' }),
	message: z.string().min(1, { message: 'Message is required' })
});

type Schema = z.infer<typeof schema>;

type Props = {
	serviceId: string;
	templateId: string;
	publicId: string;
};

const Form: FC<Props> = ({ serviceId, templateId, publicId }) => {
	const [text, setText] = useState('');
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors }
	} = useForm({
		defaultValues: {
			name: '',
			email: '',
			subject: '',
			message: ''
		},
		resolver: zodResolver(schema)
	});
	const onSubmit: SubmitHandler<Schema> = async data => {
		try {
			await emailjs.send(serviceId, templateId, data, publicId);
			setText('メッセージを送信しました。');
			reset();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{text && <p className={styles.form__text}>{text}</p>}
				<div className={styles.form__input}>
					<input
						type="text"
						placeholder="Name"
						aria-invalid={!!errors.name?.message}
						{...register('name')}
					/>
					{errors.name && <p>{errors.name.message}</p>}
				</div>
				<div className={styles.form__input}>
					<input
						type="email"
						placeholder="Email"
						aria-invalid={!!errors.email?.message}
						{...register('email')}
					/>
					{errors.email && <p>{errors.email.message}</p>}
				</div>
				<div className={styles.form__input}>
					<input
						type="text"
						placeholder="Subject"
						aria-invalid={!!errors.subject?.message}
						{...register('subject')}
					/>
					{errors.subject && <p>{errors.subject.message}</p>}
				</div>
				<div className={styles.form__input}>
					<textarea
						placeholder="Message"
						aria-invalid={!!errors.message?.message}
						{...register('message')}
					></textarea>
					{errors.message && <p>{errors.message.message}</p>}
				</div>

				<input type="submit" value="Submit" />
			</form>
		</>
	);
};

export default Form;
