
export const MenuItem = (props) => {
    return (
        <div className={"menuitem " + props.className}>
            {props.icon}
            <p>{props.text}</p>
        </div>
    );
}

export const Menu = (props) => {
    return (
        <div className={"menu " + props.className}>
            {Array.isArray(props.children) ? props.children.map((child) => {
                return child
            }) : props.children}
        </div>
    );
}