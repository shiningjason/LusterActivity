var isObject = require('lodash').isObject;
var React = require('react');
var ReactBootstrap = require('react-bootstrap')
  , Button = ReactBootstrap.Button;
var ReactRouterBootstrap = require('react-router-bootstrap')
  , ButtonLink = ReactRouterBootstrap.ButtonLink;
var Parse = require('parse').Parse;
var classNames = require('classnames');
var Activity = require('../../utils/Activity');
var AuthStore = require('../../stores/AuthStore');

/* Todos:
 * 1. 使用者可以點選參加
 * 2. 加入 FB 活動評論
 */

var ActivityDetailPage = React.createClass({
  contextTypes: { router: React.PropTypes.func },
  getInitialState: function() {
    return { activity: undefined, showManagerToolbar: false, showUserToolbar: false };
  },
  componentDidMount: function() {
    var query = new Parse.Query(Activity);
    query.get(this.getParams().id).then(
      function(activity) {
        this.setState({
          activity: activity,
          showManagerToolbar: activity.get('ACL').getWriteAccess(AuthStore.getUserId()),
          showUserToolbar: isObject(AuthStore.getUser())
        });
      }.bind(this)
    );
  },
  render: function() {
    var activity = this.state.activity;
    if (!activity) return (<div />);

    return (
      <div>
        <ButtonLink to="editActivity" params={this.getParams()} className={this.getManagerToolbarClassname()}>編輯</ButtonLink>
        <Button onClick={this.handleDelete} className={this.getManagerToolbarClassname()}>刪除</Button>
        <Button onClick={this.handleJoin} className={this.getUserToolbarClassname()}>參加</Button>
        <Button onClick={this.handleUnjoin} className={this.getUserToolbarClassname()}>不參加</Button>
        <div>名稱：{activity.get('name')}</div>
        <div>類別：{activity.get('type')}</div>
        <div>開始時間：{activity.get('startTime')}</div>
        <div>結束時間：{activity.get('endTime')}</div>
        <div>活動圖片：{activity.get('imageUrl')}</div>
        <div>描述：{activity.get('description')}</div>
        <div>地址：{activity.get('address')}</div>
      </div>
    );
  },
  getParams: function() {
    return this.context.router.getCurrentParams();
  },
  handleDelete: function() {
    var activity = this.state.activity;
    if (!activity) {
      alert('尚未讀取資料');
      return;
    }
    if (!confirm('是否要刪除活動？')) return;

    activity.destroy().then(function() {
      this.context.router.transitionTo('home');
    }.bind(this), function() {
      alert('刪除失敗');
    });
  },
  handleJoin: function() {

  },
  handleUnjoin: function() {

  },
  getManagerToolbarClassname: function() {
    return classNames({ 'hidden': !this.state.showManagerToolbar });
  },
  getUserToolbarClassname: function() {
    return classNames({ 'hidden': !this.state.showUserToolbar });
  }
});

module.exports = ActivityDetailPage;
