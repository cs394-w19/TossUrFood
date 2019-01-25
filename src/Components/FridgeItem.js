import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import ListAddIcon from '@material-ui/icons/PlaylistAdd';

//item name, days until expiration

export default class FridgeItem extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			showEdit: false
		};
		this.toggleEdit = this.toggleEdit.bind(this);
	}

    prettyDate(date) {
        if (date === 1)
        {
            return "Expiring in " + String(date) + " day.";
        }
        else
        {
            return "Expiring in " +  String(date) + " days.";
        }
    }

    getDateFromDaysTil(days_til) {
    	let date = new Date();
    	date.setDate(date.getDate() + days_til);
    	let day = date.getDate();
    	if (day < 10)
    	{
    		day = '0' + day;
    	}
    	let month = date.getMonth() + 1;
    	if (month < 10)
    	{
    		month = '0' + month;
    	}
    	let year = date.getFullYear();
    	let new_date = year + '-' + month + '-' + day;
    	return new_date;
    }

    delete_confirm = (item) => {
		this.props.toggleDelConfirm(item);
	}

    prettyInfo(quantity, days_til) {
        return "Quantity: " + String(quantity) + ". " + this.prettyDate(days_til)
    }

	toggleEdit() {
		this.setState({
			showEdit: !this.state.showEdit
		});
	}

    render() {

      let item_class = "list-item";
      if (this.props.date <= 0){
        item_class = "list-item yellow";
      }
      return (
      	<>
  		{!this.state.showEdit ?
            <ListItem className={item_class} onClick={this.toggleEdit}>
                <ListItemText primary={this.props.item} secondary={this.prettyInfo(this.props.quantity, this.props.date)} />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => this.delete_confirm(this.props.item)}>
                    <DeleteIcon/>
		              </IconButton>
                  <IconButton >
                    <ListAddIcon onClick={() => this.props.fillInput(this.props.item)}/>
                  </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        	:
        	<><br/>
            <form>
            	Item: <input type="text" defaultValue={this.props.item}/>
            </form><br/>
            <form>
            	Expiration Date: <input type="date" value={this.getDateFromDaysTil(this.props.date)}/>
            </form><br/>
            <button className="popup_button left" onClick={this.toggleEdit}>Done</button>
            <button className="popup_button right" onClick={this.toggleEdit}>Cancel</button>
            </>
        }
	    </>
        )
    }
}
