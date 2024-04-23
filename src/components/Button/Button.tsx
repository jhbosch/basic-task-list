import Button from "@mui/material/Button";
import FeatherIcon from "feather-icons-react";
import { IButtonAction, IButtonIcon } from "../../util/interface";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useBreakpoint from "use-breakpoint";
import { BREAKPOINTS } from "../../util/constants";


const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'capitalize',
  fontSize: 14,
  padding: '8px 24px 8px 16px',
  border: '1px solid',
  color: '#8A94A6',
  lineHeight: '14px',
  backgroundColor: '#ffffff',
  borderColor: '#C6CDD2',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#808182',
    color: '#fff',
    borderColor: '#0f0f0f',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#fff',
    borderColor: '#ccc',
    color: '#000'
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const BootstrapIconButton = styled(IconButton)({
  color: '#ffffff',
  backgroundColor: 'rgba(13, 85, 207, 1)',
  borderColor: '#fff',
  borderRadius: '7%',
  '&:hover': {
    backgroundColor: 'rgba(13, 85, 207, 1)',
    color: '#fff',
    borderColor: '#fff',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'rgba(13, 85, 207, 1)',
    color: '#000'
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(13, 85, 207, 0.1)',
  },
});



export const ButtonIcon = ({data, disabled = false} : {data:IButtonIcon, disabled: boolean}) => {

  return (
    <BootstrapButton
      className="container-task-add-button-bar-icon-btn"
      variant="contained"
      disableElevation
      startIcon={<FeatherIcon icon={data.icon} />}
      disableRipple
      disabled={disabled}
    >
      {data.title}
    </BootstrapButton>
  )
}

export const Icon = ({data, disabled = false} : {data:IButtonIcon, disabled: boolean}) => {

  return (
    <IconButton
      className="container-task-add-button-bar-icon-btn icon-btn"
      aria-label={data.title}
      disabled={disabled}
    >
      <FeatherIcon icon={data.icon} />
    </IconButton>
  )
}

export const ButtonIconResponse = ({data, disabled = false} : {data:IButtonIcon, disabled: boolean}) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const ResponseBtn = breakpoint === 'desktop' ? ButtonIcon :  Icon
  return  <ResponseBtn data={data} disabled={disabled} />

}

export const ButtonAction = ({title, onClick} : IButtonAction) => {
  return (
    <Button
      className="container-task-add-button-bar-action-btn"
      variant="contained"
      disableElevation
      disableRipple
      onClick={onClick}
      color="primary"
    >
      {title}
    </Button>
  )
}

export const IconAction = ({title, icon, onClick} :IButtonAction) => {
  return (
    <BootstrapIconButton
      className=""
      aria-label={title}
      color="primary"
      onClick={onClick}
    >
      <FeatherIcon icon={icon} />
    </BootstrapIconButton>
  )
}

export const ButtonActionResponsePrimary = ({title, icon , onClick} : IButtonAction) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  const ResponseBtn = breakpoint === 'desktop' ? ButtonAction :  IconAction
  return  <ResponseBtn title={title} icon={icon}  onClick={onClick} />

}

export const ButtonActionResponseDelete = ({title, onClick, disabled = false} : IButtonAction) => {
  const { breakpoint } = useBreakpoint(BREAKPOINTS);
  return (
    breakpoint === 'desktop' && <BootstrapButton
      className="container-task-add-button-bar-action-btn-cancel"
      variant="contained"
      disableElevation
      disableRipple
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </BootstrapButton>
  )

}

