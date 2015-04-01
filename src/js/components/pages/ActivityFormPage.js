var React = require('react/addons');
var ReactBootstrap = require('react-bootstrap')
  , Input = ReactBootstrap.Input;
var Parse = require('parse').Parse;
var Activity = require('../../utils/Activity');
var AuthStore = require('../../stores/AuthStore');

/* Todos:
 * 1. Form validation & messages
 * 2. Datepicker & Timepicker
 * 3. Google image search engine
 */

var ActivityFormPage = React.createClass({
  contextTypes: { router: React.PropTypes.func },
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return { activity: undefined };
  },
  componentDidMount: function() {
    if (!this.getParams().id) return;

    new Parse.Query(Activity)
      .get(this.getParams().id)
      .then(function(activity) {
        if (!activity.get('ACL').getWriteAccess(AuthStore.getUserId())) {
          this.context.router.transitionTo('activityDetail', { id: activity.id });
        }
        this.setState({
          activity: activity,
          name: activity.get('name'),
          type: activity.get('type'),
          imageUrl: activity.get('imageUrl'),
          startTime: activity.get('startTime'),
          endTime: activity.get('endTime'),
          description: activity.get('description'),
          address: activity.get('address')
        });
      }.bind(this));
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" label="名稱" valueLink={this.linkState('name')} />
          <Input type="select" label="類別" valueLink={this.linkState('type')}>
            <option value="電影">電影</option>
            <option value="電玩">電玩</option>
            <option value="桌遊">桌遊</option>
            <option value="讀書">讀書</option>
            <option value="運動">運動</option>
            <option value="其他">其他</option>
          </Input>
          <Input type="text" label="開始時間" valueLink={this.linkState('startTime')} />
          <Input type="text" label="結束時間" valueLink={this.linkState('endTime')} />
          <Input type="text" label="活動圖片" valueLink={this.linkState('imageUrl')} />
          <Input type="textarea" label="描述" valueLink={this.linkState('description')} />
          <Input type="text" label="地點" defaultValue="台北市信義區基隆路二段189號" valueLink={this.linkState('address')} />
          <Input type="submit" value="送出" />
        </form>
      </div>
    );
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var activity;
    if (this.getParams().id) {
      activity = this.state.activity;
      if (!activity) {
        alert('尚未讀取完資料');
        return;
      }
    } else {
      activity = new Activity();
    }

    activity.set('name', this.state.name);
    activity.set('type', this.state.type);
    activity.set('startTime', this.state.startTime);
    activity.set('endTime', this.state.endTime);
    activity.set('imageUrl', this.state.imageUrl);
    activity.set('description', this.state.description);
    activity.set('address', this.state.address);

    var acl = new Parse.ACL();
    acl.setPublicReadAccess(true);
    acl.setWriteAccess(AuthStore.getUserId(), true);
    activity.setACL(acl);

    activity.save().then(function(activity) {
      this.context.router.transitionTo('activityDetail', { id: activity.id });
    }.bind(this), function() {
      alert('儲存失敗');
    });
  },
  getParams: function() {
    return this.context.router.getCurrentParams();
  }
});

module.exports = ActivityFormPage;
