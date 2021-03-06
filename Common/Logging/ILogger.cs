using System;

namespace Common.Logging
{
    public interface ILogger
    {
        void Debug(string messageTemplate, params object[] propertyValues);
        void Debug(Exception exception, string messageTemplate, params object[] propertyValues);
        void Information(string messageTemplate, params object[] propertyValues);
        void Information(Exception exception, string messageTemplate, params object[] propertyValues);
        void Warning(string messageTemplate, params object[] propertyValues);
        void Warning(Exception exception, string messageTemplate, params object[] propertyValues);
        void Error(string messageTemplate, params object[] propertyValues);
        void Error(Exception exception, string messageTemplate, params object[] propertyValues);
        void Fatal(string messageTemplate, params object[] propertyValues);
        void Fatal(Exception exception, string messageTemplate, params object[] propertyValues);
        ITaskTimer StartTask(string name);
        ITaskTimer StartTask(string name, ITaskTimer parentTaskTimer);
        ITaskTimer StartTaskFormat(string formatName, params object[] args);
        ITaskTimer StartTaskFormat(ITaskTimer parentTaskTimer, string formatName, params object[] args);
    }
}