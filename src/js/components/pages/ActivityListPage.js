var React = require('react');
var Router = require('react-router')
  , Link = Router.Link;
var ReactBootstrap = require('react-bootstrap')
  , Button = ReactBootstrap.Button
  , Input = ReactBootstrap.Input;
var Parse = require('parse').Parse;
var Activity = require('../../utils/Activity');

/* Todos:
 * 1. Search Bar
 * 2. Create Fragment
 */

var ActivityListPage = React.createClass({
  getInitialState: function() {
    return { activities: [] };
  },
  componentDidMount: function() {
    var query = new Parse.Query(Activity);
    query.find().then(
      function(results) {
        this.setState({ activities: results });
      }.bind(this)
    );
  },
  render: function() {
    var activityNodes = this.state.activities.map(function(activity) {
      return (
        <div key={activity.id}>
          <Link to="activityDetail" params={{ id: activity.id }}>{activity.get('name')}</Link>
          <div>類別：{activity.get('type')}</div>
          <div>開始時間：{activity.get('startTime')}</div>
          <div>結束時間：{activity.get('endTime')}</div>
          <div>活動圖片：{activity.get('imageUrl')}</div>
          <div>描述：{activity.get('description')}</div>
          <div>地址：{activity.get('address')}</div>
        </div>
      );
    });
    var searchBtn = <Button onClick={this.handleSearch}><i className="glyphicon glyphicon-search" /></Button>;
    return (
      <div>
        <Input type="text" placeholder="搜尋" buttonAfter={searchBtn} />
        {activityNodes}
      </div>
    );
  },
  handleSearch: function() {
  }
});

module.exports = ActivityListPage;
