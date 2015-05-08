using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Core.PushNotification;
using Infrastructure.Repository;
using PushSharp;
using PushSharp.Android;

namespace Infrastructure.Services.PushNotification
{
    public class AndroidPushNotificationService : IAndroidPushNotificationService
    {

        private readonly PushBroker _pushBroker;
        private readonly IPushRepository _repository;
        //private readonly int _timeToLive = 1800; // in seconds = 30 minutes
        public bool isStarted;

        private string androidAppName = "com.sayedAlShohada";

        public AndroidPushNotificationService(IPushRepository repository)
        {
            this._repository = repository;
            this._pushBroker = new PushBroker();

            ////Wire up the events for all the services that the broker registers            
            //this._pushBroker.OnNotificationSent += this.NotificationSent;
            //this._pushBroker.OnChannelException += this.ChannelException;
            //this._pushBroker.OnServiceException += this.ServiceException;
            //this._pushBroker.OnDeviceSubscriptionExpired += this.DeviceSubscriptionExpired;
            //this._pushBroker.OnDeviceSubscriptionChanged += this.DeviceSubscriptionChanged;
            //this._pushBroker.OnChannelCreated += this.ChannelCreated;
            //this._pushBroker.OnChannelDestroyed += this.ChannelDestroyed;

            this.isStarted = false;
        }
        public void Start()
        {
            // Register Android Service
            //WARNING: The following key is generated from this location: 
            // https://console.developers.google.com/project/864860074818/apiui/credential?authuser=2
            var serverApiKey = " AIzaSyAik7oKuv4q9Xo9I-nvnF3Rbu9CsErcBVM";
            this._pushBroker.RegisterGcmService(new GcmPushChannelSettings(serverApiKey), androidAppName);
        }

        public void Stop()
        {
            //Stop and wait for the queues to drains
            this._pushBroker.StopAllServices();
        }


        public void SendMessage(string message, List<PushDeviceInfo> devices)
        {
            if (!this.isStarted) this.Start();
            this.isStarted = true;

            var androidAppList = devices.Where(x => x.Platform.ToLower() == "android").ToList();
            if (androidAppList.Any())
            {
                var firstOrDefault = androidAppList.FirstOrDefault();
                if (firstOrDefault != null)
                {
                    var a = new GcmNotification().ForDeviceRegistrationId(firstOrDefault.DeviceToken)
                             .WithJson("{\"message\":\" " + message + "\"}");
                    //.WithJson("{\"message\":\" " + message + "\",\"badge\":0,\"msgcnt\":\" " + msgcnt + "\"}");
                    //a.TimeToLive = this._timeToLive;
                    this._pushBroker.QueueNotification(a, androidAppName);
                }
            }
        }


    }
}
