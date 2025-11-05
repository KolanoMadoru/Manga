import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Copy } from 'lucide-react';

const FirebaseConfigChecker = () => {
  const [config, setConfig] = useState({});
  const [checks, setChecks] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const envConfig = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
    };

    setConfig(envConfig);

    const validationChecks = [
      {
        name: 'API Key',
        key: 'apiKey',
        value: envConfig.apiKey,
        isValid: envConfig.apiKey && !envConfig.apiKey.includes('demo-') && envConfig.apiKey !== 'your_api_key_here',
      },
      {
        name: 'Auth Domain',
        key: 'authDomain',
        value: envConfig.authDomain,
        isValid: envConfig.authDomain && envConfig.authDomain.includes('.firebaseapp.com'),
      },
      {
        name: 'Project ID',
        key: 'projectId',
        value: envConfig.projectId,
        isValid: envConfig.projectId && envConfig.projectId !== 'demo-project',
      },
      {
        name: 'Storage Bucket',
        key: 'storageBucket',
        value: envConfig.storageBucket,
        isValid: envConfig.storageBucket && envConfig.storageBucket.includes('.appspot.com'),
      },
      {
        name: 'Messaging Sender ID',
        key: 'messagingSenderId',
        value: envConfig.messagingSenderId,
        isValid: envConfig.messagingSenderId && envConfig.messagingSenderId !== '123456789',
      },
      {
        name: 'App ID',
        key: 'appId',
        value: envConfig.appId,
        isValid: envConfig.appId && envConfig.appId.includes(':web:'),
      },
    ];

    setChecks(validationChecks);
  }, []);

  const allValid = checks.every(check => check.isValid);
  const currentDomain = window.location.hostname;
  const isProduction = !currentDomain.includes('localhost');

  const copyDiagnostics = () => {
    const diagnostics = {
      domain: currentDomain,
      isProduction,
      timestamp: new Date().toISOString(),
      checks: checks.map(c => ({
        name: c.name,
        isValid: c.isValid,
        hasValue: !!c.value,
      })),
      allValid,
    };

    navigator.clipboard.writeText(JSON.stringify(diagnostics, null, 2));
    alert('Diagnostics copied to clipboard!');
  };

  if (allValid && isProduction) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-yellow-500 text-white rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
        >
          <AlertCircle className="w-5 h-5" />
          <span>Config Check</span>
        </button>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 max-w-md border-2 border-yellow-500">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Firebase Config Status
            </h3>
            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Domain:</strong> {currentDomain}
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Environment:</strong> {isProduction ? 'Production' : 'Development'}
            </p>
          </div>

          <div className="space-y-2 mb-4">
            {checks.map((check) => (
              <div
                key={check.key}
                className="flex items-start space-x-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50"
              >
                {check.isValid ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {check.name}
                  </p>
                  {check.isValid ? (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      {check.value?.substring(0, 30)}...
                    </p>
                  ) : (
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {!check.value
                        ? 'Not set - Add to environment variables'
                        : 'Using placeholder value'}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!allValid && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-2">
                ⚠️ Configuration Issues Detected
              </p>
              {isProduction ? (
                <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                  <li>Add environment variables in Netlify Dashboard</li>
                  <li>Site configuration → Environment variables</li>
                  <li>Redeploy after adding variables</li>
                  <li>See DEPLOYMENT_TROUBLESHOOTING.md</li>
                </ul>
              ) : (
                <ul className="text-xs text-red-700 dark:text-red-300 space-y-1 list-disc list-inside">
                  <li>Create .env.local from .env.example</li>
                  <li>Get credentials from Firebase Console</li>
                  <li>Run: node scripts/check-firebase-config.js</li>
                </ul>
              )}
            </div>
          )}

          {isProduction && !allValid && (
            <div className="mb-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <p className="text-sm text-purple-800 dark:text-purple-200 font-medium mb-2">
                🔐 Firebase Authorized Domains
              </p>
              <p className="text-xs text-purple-700 dark:text-purple-300 mb-2">
                Add this domain to Firebase Console:
              </p>
              <code className="block text-xs bg-purple-100 dark:bg-purple-900/50 p-2 rounded text-purple-900 dark:text-purple-100">
                {currentDomain}
              </code>
              <p className="text-xs text-purple-700 dark:text-purple-300 mt-2">
                Firebase Console → Authentication → Settings → Authorized domains
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            <button
              onClick={copyDiagnostics}
              className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
            >
              <Copy className="w-4 h-4" />
              <span>Copy Diagnostics</span>
            </button>
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm text-center"
            >
              Firebase Console
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseConfigChecker;
