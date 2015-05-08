using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using Core.PushNotification;
using Infrastructure.Repository;
using Infrastructure.Repository.Imp;
using Infrastructure.Services.PushNotification;
using PushSharp;
using PushSharp.Core;
using SayedAlShohada.Models;

namespace SayedAlShohada.Controllers
{
    public class NotificationTestController : ApiController
    {

        private readonly IAndroidPushNotificationService _androidPushService;
        private readonly IApplePushNotificationService _applePushService;
        private readonly IPushRepository _pushRepository;

        public NotificationTestController()
        {
            _pushRepository = new PushRepository();

            _androidPushService = new AndroidPushNotificationService(_pushRepository);

            _applePushService = new ApplePushNotificationService(_pushRepository);
        }

        //public ActionResult Push()
        //{
        //    return View();
        //}

        [System.Web.Mvc.HttpPost]
       public void Push([FromBody] PushView form)
        {
            if (!string.IsNullOrEmpty(form.token))
            {
                var deviceInfo = new PushDeviceInfo();
                deviceInfo.Platform = form.platform;
                deviceInfo.DeviceToken = form.token;
                var listDeviceInfo = new List<PushDeviceInfo>();
                listDeviceInfo.Add(deviceInfo);

                if (form.platform.ToLower() == "android")
                    this._androidPushService.SendMessage(form.message, listDeviceInfo);
                //if (applicationkey == DeviceTypeEnum.Android.ApplicationKey)
                //    this._androidService.SendMessage(message, listDeviceInfo);
                else
                    this._applePushService.SendMessage(form.message, listDeviceInfo);
            }

            //return this.RedirectToAction("Push");
        }
    }
}