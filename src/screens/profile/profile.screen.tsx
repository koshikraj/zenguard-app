import { Button, Container, Stack, Textarea, TextInput } from '@mantine/core';
import { Title } from '../../components';
import { useStyles } from './profile.screen.styles';

export const ProfileScreen = () => {
	const { classes } = useStyles();
	return (
		<Container className={classes.profileContainer}>
			<Container sx={{ padding: 0, marginBottom: '32px' }}>
				<Title text='Profile' />
			</Container>
			<Container className={classes.formContainer}>
				<Stack
					// align='flex-start'
					justify='flex-start'
				>
					<TextInput
						type='text'
						placeholder='Koushith'
						label='Name'
						rightSectionWidth={92}
					/>
					<TextInput
						type='email'
						placeholder='koushith@consensolabs.com'
						label='Email'
						rightSectionWidth={92}
					/>
					<Textarea
						placeholder='Enter here'
						label='Bio'
						rightSectionWidth={92}
					/>
					<Button className={classes.button}>Update</Button>
				</Stack>
			</Container>
		</Container>
	);
};
