import IconButton from "@material-ui/core/IconButton";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownAltIcon from "@material-ui/icons/ThumbDownAlt";
export const ThumsUpButton = (props) => {
  return (
    <div className="mt-3 d-flex justify-content-start align-items-center">
      <IconButton
        color="primary"
        aria-label="Like a Post"
        onClick={props.onClick}
        data-toggle="tooltip"
        data-placement="top"
        title="like this post"
      >
        <ThumbUpAltIcon />
      </IconButton>
      <div className="font-weight-bolder">
        {props.likes === 0 ? "be the first one to like it" : props.likes}
      </div>
    </div>
  );
};
export const ThumbDownButton = (props) => {
  return (
    <div className="mt-3 d-flex justify-content-start align-items-center">
      <IconButton
        color="primary"
        aria-label="Like a Post"
        onClick={props.onClick}
        data-toggle="tooltip"
        data-placement="top"
        title="unlike this post"
      >
        <ThumbDownAltIcon />
      </IconButton>
      <div className="font-weight-bolder">{props.likes}</div>
    </div>
  );
};
